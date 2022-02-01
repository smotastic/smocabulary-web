import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import CourseDetailContainer from "../../src/course-detail/application/course-detail.container";

export default function CourseDetailPage() {
    const router = useRouter();
    const { query } = router;
    if (!query.id) {
        return <Skeleton />
    }
    return <CourseDetailContainer id={query.id as string} />
}