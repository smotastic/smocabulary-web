import { GetServerSideProps } from 'next';
import CourseList from '../src/course-list/application/course-list.container';
import { CourseEntry } from '../src/course-list/domain/course-list-entry.entity';
import { CourseListUsecaseImpl } from '../src/course-list/domain/course-list.usecase';
import { container, TOKENS } from '../src/service_locator';

type HomeProps = {
  catalogs: CourseEntry[]
}

export default function Home({ catalogs }: HomeProps) {
  return <CourseList catalogs={catalogs} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const usecase = container.get(TOKENS.catalogListUsecase);
  const catalogs = await usecase.execute({});
  return {
    props: {
      catalogs
    }
  }
}