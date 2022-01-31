import { useSession } from "next-auth/react";
import CourseListContextProvider, { CourseListContext } from "../src/course-list/application/context/course-list.context";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import SnackbarGlobal from "./snackbarglobal";

type WrappedAppProps = { children: React.ReactNode }

export default function WrappedApp({ children }: WrappedAppProps) {
    const { data, status } = useSession();

    return (
        <>
            <CourseListContextProvider>
                <SnackbarGlobal>
                    {!data && <Layout>{children}</Layout>}
                    {data && <Layout><Dashboard>{children}</Dashboard></Layout>}
                </SnackbarGlobal>
            </CourseListContextProvider>
        </>
    )
}