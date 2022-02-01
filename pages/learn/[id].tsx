import { useRouter } from "next/router";
import LearnContainer from "../../src/learn/application/learn.container";


export default function LearnPage() {
    const router = useRouter();
    const {query} = router;
    const course_id = query.id as string;

    return <LearnContainer id={course_id} />
}