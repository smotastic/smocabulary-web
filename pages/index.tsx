import { GetServerSideProps } from 'next';
import CatalogList from '../src/course-list/application/course-list.container';
import { CatalogEntry } from '../src/course-list/domain/course-list-entry.entity';
import { CatalogListUsecaseImpl } from '../src/course-list/domain/course-list.usecase';
import { container, TOKENS } from '../src/service_locator';

type HomeProps = {
  catalogs: CatalogEntry[]
}

export default function Home({ catalogs }: HomeProps) {
  return <CatalogList catalogs={catalogs} />
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