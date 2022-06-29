import { QuizListDataWithDateAsString, withViewDate } from "../../models/Quiz";
import { Page } from "../../next-types/Page";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import prisma from "../../globals/db";

import styles from "../../styles/ListOwnQuizzes.module.css";
import ProtectedPage from "../../layouts/ProtectedPage";

type ListOwnQuizzesProps = {
  quizzes: QuizListDataWithDateAsString[];
};

const ListOwnQuizzes: Page<ListOwnQuizzesProps> = ({
  quizzes,
}: ListOwnQuizzesProps) => {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Number of questions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>
                <Link href={`/play/quiz/${quiz.id}`}>
                  <a className={styles.quizLink}>{quiz.title}</a>
                </Link>
              </td>
              <td>{quiz._count.questions}</td>
              <td>{quiz.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

ListOwnQuizzes.layout = ProtectedPage;

export default ListOwnQuizzes;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {
        session,
      },
    };
  }
  const quizzes = await prisma.quiz.findMany({
    where: {
      owner: session.user,
    },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });
  return {
    props: {
      session,
      quizzes: quizzes.map((q) => withViewDate(q)),
    },
  };
};
