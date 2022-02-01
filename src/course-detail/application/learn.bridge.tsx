import { useRouter } from "next/router";
import { Bridge } from "../../core/application/bridge";

export default function useLearnBridge(): Bridge<string, void> {
    const router = useRouter();
    return {
        connect: (id) => router.push(`/learn/${id}`)
    }
}