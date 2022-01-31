import { Box } from "@mui/material";

import { CatalogEntry } from "../domain/entities/catalog_entry";
import CatalogCard from "./catalog_card";

type CatalogListProps = {
    catalogs: CatalogEntry[]
}

export default function CatalogList({ catalogs }: CatalogListProps) {
    return <>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start' }}>
            {catalogs.map(catalog => <CatalogCard key={catalog.name} catalog={catalog} />)}
        </Box>
    </>
}

