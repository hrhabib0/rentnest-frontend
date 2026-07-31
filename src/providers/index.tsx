"use client";

import { Toaster } from "sonner";
import QueryProvider from "./QueryProvider";

type Props = {
    children: React.ReactNode;
};

export default function Providers({ children }: Props) {
    return (
        <QueryProvider>
            {children}
            <Toaster richColors position="top-right" />
        </QueryProvider>
    );
}