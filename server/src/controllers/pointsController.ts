// Controlador para as funcionalidades da tabela Points.

import knex from "../database/connection";
import { Request, Response } from "express";

class PointsController {
  // 1. => Listar todos os pontos cadastrados.
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `http://192.168.15.37:3333/uploads/${point.image}`,
        };
      });

    return response.json(serializedPoints);
  }

  // 2. => Listar UM ponto específico.
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found." });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

      const serializedPoint = {
          ...point,
          image_url: `http://192.168.15.37:3333/uploads/${point.image}`,
        };

    return response.json({ point: serializedPoint, items });
  }

  // 3. => Criar ponto de coleta.
  async create(request: Request, response: Response) {
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      request.body; // dados que vêm do body. 

    const trx = await knex.transaction()

    // ### constante para deixar o código mais organizado, alocando todos os dados recebidos do request.
    const point = {
      image: request.file?.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point); // criando registro na tabela points.

    const point_id = insertedIds[0];

    const pointItems = items
    .split(',')
    .map((item: string) => Number(item.trim()))
    .map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit()

    return response.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
