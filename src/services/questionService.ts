import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebaseConfig";

const db = getFirestore(app);

interface Question {
  Answer: string;
  Options: string[];
  Question: string;
}

async function fetchQuestions(): Promise<Question[]> {
  const questionsCollection = collection(db, "questions");
  const questionsSnapshot = await getDocs(questionsCollection);
  const questionsList = questionsSnapshot.docs.map(
    (doc) => doc.data() as Question
  );
  return questionsList;
}

export { fetchQuestions };
