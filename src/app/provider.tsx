"use client";
import { memo } from "react";

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default memo(Provider);
