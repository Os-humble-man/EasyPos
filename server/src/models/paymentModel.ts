// import prisma from "../_core/database";

// const paymentModel = {
//   createPayment: async (data: {
//     userId: number;
//     amount: number;
//     paymentMethod: string;
//   }) => {
//     try {
//       const payment = await prisma.payments.create({
//         data: {
//           user_id: data.userId,
//           amount: data.amount,
//         //   payment_method: data.paymentMethod,
//         },
//       });
//       return payment;
//     } catch (error: Error | any) {
//       throw new Error(error);
//     }
//   },
// };
