import { Btn } from "@/components";

export default function Test() {
    return(
        <div className="flex gap-2">
           <Btn
                colorSet="blue"
                form="rect"
           >
                Button
            </Btn> 

            <Btn
                colorSet="blue"
                form="round"
            >
                Button
            </Btn> 

            <Btn
                colorSet="blue_ghost"
                form="round"
            >
                Button
            </Btn> 

            <Btn
                colorSet="orange"
                form="round"
            >
                Button
            </Btn> 

            <Btn
                colorSet="black"
                form="round"
            >
                Button
            </Btn>

            <Btn
                colorSet="white"
                form="rect"
            >
                Button
            </Btn>
        </div>
    )
}