import { Request, Response } from "express";

const bluetoothService = require("../services/bluetoothService");

const printerController = {
  connect: async (req: Request, res: Response) => {
    try {
      await bluetoothService.connectToPrinter();
      res.status(200).send("Imprimante connectée");
    } catch (err: Error | any) {
      res.status(500).send("Erreur de connexion Bluetooth: " + err.message);
    }
  },

  print: async (req: Request, res: Response): Promise<void> => {
    const { data } = req.body;

    if (!data) {
      res.status(400).send("Aucune donnée à imprimer");
    }

    try {
      await bluetoothService.printData(data);
      res.status(200).send("Impression réussie");
    } catch (err: Error | any) {
      res.status(500).send("Erreur d'impression: " + err.message);
    }
  },
};

export default printerController;
