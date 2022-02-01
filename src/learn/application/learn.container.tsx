import { useQuery } from "react-query"
import { container, TOKENS } from "../../service_locator"
import LearnLoading from "./learn.loading";
import LearnView from "./learn.view";

type LearnContainerProps = {
    id: string;
}

export default function LearnContainer({ id }: LearnContainerProps) {
    const initUsecase = container.get(TOKENS.learnInitUsecase);
    const { data, isLoading } = useQuery(`learn${id}`, () => initUsecase.execute({ id }));
    if (isLoading) {
        return <LearnLoading />;
    }
    return <LearnView cards={data} />
}