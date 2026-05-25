import {
    Header,
    Reservations
} from "./_sections";
import { Suspense } from "react";

export default function MyStaysPage () {
    return (
        <div>
            <Suspense fallback={null}>
                <Header />
                <Reservations />
            </Suspense>
        </div>
    )
}
