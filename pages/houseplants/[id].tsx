import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import DetailForm from "../../components/houseplants/HouseplantDetailForm"
import { SnackbarContext } from "../../context/snackbar";
import { HouseplantData } from "../../data/houseplants"
import { useQuery, useQueryClient } from "react-query";
import { apiPath } from "../../utils/api.path";
import { pagePath } from "../../utils/page.path";

export default function Detail() {
    const { openSnackbar } = useContext(SnackbarContext);
    const queryClient = useQueryClient()
    const router = useRouter();

    const { id } = router.query;
    const { isLoading, error, data, isFetching } = useQuery(`masterFindById${id}`, () =>
        fetch(`${apiPath.houseplants}/findById/${id}`).then((res) => res.json())
    );
    if (isLoading) {
        return <DetailSkeleton />;
    }
    if(data.status >= 400) {
        return <div>{data.msg}</div>
    }

    const handleSubmit = (updatingData: HouseplantData) => {
        if (!data) return;
        async function update() {
            try {
                const res = await fetch(`${apiPath.houseplants}/update`, {
                    method: 'POST',
                    body: JSON.stringify(updatingData)
                })
                
            } catch (error) {
                openSnackbar({ msg: `Error updating ${updatingData.name}`, severity: 'error' })
                return;
            }
            await queryClient.invalidateQueries(`masterFindById${id}`);
            openSnackbar({ msg: `Successfully updated ${updatingData.name}`, severity: 'success' })
            router.push(pagePath.houseplants);
        }
        update();
    };



    return <DetailForm data={data.data} onSubmit={handleSubmit} type="Update" />
}

function DetailSkeleton() {
    return <>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" height={'100%'} />
    </>
}
