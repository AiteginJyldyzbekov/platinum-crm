import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export interface DriverTransactionHistory {
    amount: string
    date: string
    expenseType: string
}

export interface DriverImages {
    file?: File | null
    url: string | null
    isLoading: boolean
    name: string
}

export interface Driver {
    email: string
    password: string
    tid?: string
    name: string
    lastName: string
    phoneNumber: string
    images?: DriverImages[]
    balance: number
    transactionHistory: DriverTransactionHistory[]
    startRentDate: string | any
    weekendDates: string[] | any
    car?: string
    status: string
}

exports.dailyBalanceUpdate = functions.pubsub.schedule("0 0 * * *")
  .timeZone("Asia/Bishkek")
  .onRun(async () => {
    try {
      const db = admin.firestore();
      const driversRef = db.collection("users")
        .where("role", "==", "driver")
        .where("status", "==", "atWork");

      const snapshot = await driversRef.get();
      const updates: Promise<any>[] = [];

      snapshot.forEach(async (doc: admin.firestore.QueryDocumentSnapshot) => {
        const driver = doc.data() as Driver;
        const carRef = db.collection("cars").doc(driver?.car || "");
        const carDoc = await carRef.get();
        if (!carDoc.exists) {
          console.log(`Car document with ID ${driver.car} does not exist`);
          return;
        }

        const carData = carDoc.data();
        if (!carData || !carData.payment) {
          console.log(
            `
            Car document with ID ${driver.car} does not have payment information
            `);
          return;
        }

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const todayFormatted = `${yyyy}-${mm}-${dd}`;

        const [day, month, year] = driver.startRentDate.split("/");
        const startRentDate = new Date(`${year}-${month}-${day}`);

        if (
          driver.weekendDates.includes(todayFormatted) ||
                    today < startRentDate
        ) {
          console.log(`
                    Today (${todayFormatted
}
                ) is a weekend day for the driver or rental has not yet started
                    `);
        } else {
          const newBalance = driver.balance - carData.payment;
          updates.push(doc.ref.update({balance: newBalance}));
        }
      });

      await Promise.all(updates);
      console.log("Daily balance update completed successfully");
      return null;
    } catch (error) {
      console.error("Error updating daily balance:", error);
      throw error;
    }
  });
