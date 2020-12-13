import { useEffect } from "react";
import { useRef } from "react";

export default function  usePrev(value) {
    const prev = useRef();

    useEffect(() => {
        prev.current = value;
    }, [value])
    return prev.current;
}
