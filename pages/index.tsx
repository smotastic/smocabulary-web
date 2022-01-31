import { GetServerSideProps } from 'next';
import CatalogList from '../src/cataloglist/application/list';
import { CatalogEntry } from '../src/cataloglist/domain/entities/catalog_entry';
import { CatalogListUsecaseImpl } from '../src/cataloglist/domain/usecase/catalog_list_usecase';
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