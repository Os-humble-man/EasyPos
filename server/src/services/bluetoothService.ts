// import { WithImplicitCoercion } from "buffer";

// const BluetoothSerialPort = require("bluetooth-serial-port");

// class BluetoothService {
//   private btSerial: any;
//   private isConnected: boolean;

//   constructor() {
//     this.btSerial = new BluetoothSerialPort.BluetoothSerialPort();
//     this.isConnected = false;
//   }

//   // Se connecter à l'imprimante Bluetooth
//   connectToPrinter(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       this.btSerial.on("found", (address: any, name: string | undefined) => {
//         if (name === process.env.PRINTER_NAME) {
//           // Utilisez une variable d'environnement pour le nom
//           this.btSerial.findSerialPortChannel(address, (channel: any) => {
//             this.btSerial.connect(
//               address,
//               channel,
//               () => {
//                 console.log("Connecté à l'imprimante Bluetooth:", name);
//                 this.isConnected = true;
//                 resolve();
//               },
//               (err: any) => {
//                 console.error("Erreur de connexion Bluetooth:", err);
//                 reject(err);
//               }
//             );
//           });
//         }
//       });

//       this.btSerial.inquire();
//     });
//   }

//   // Envoyer des données à l'imprimante
//   printData(data: WithImplicitCoercion<string>): Promise<void> {
//     return new Promise((resolve, reject) => {
//       if (!this.isConnected) {
//         return reject(new Error("Imprimante non connectée"));
//       }

//       this.btSerial.write(Buffer.from(data, "utf-8"), (err: any) => {
//         if (err) {
//           console.error("Erreur lors de l'envoi des données:", err);
//           reject(err);
//         } else {
//           console.log("Données envoyées à l'imprimante:", data);
//           resolve();
//         }
//       });
//     });
//   }
// }

// export default new BluetoothService();
