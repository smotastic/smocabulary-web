import { GetServerSideProps } from 'next';
import CourseListContainer from '../src/course-list/application/course-list.container';
import { CourseEntry } from '../src/course-list/domain/course-list-entry.entity';
import { container, TOKENS } from '../src/service_locator';

type HomeProps = {
  courses: CourseEntry[]
}

export default function Home({ courses }: HomeProps) {
  return <CourseListContainer courses={courses} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usecase = container.get(TOKENS.courseListUsecase);
  const courses = await usecase.execute({});
  return {
    props: {
      courses
    }
  }
}