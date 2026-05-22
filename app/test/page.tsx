import { 
    Btn,
    RoomCard
 } from "@/components";
import { view } from "@/components/Cards/RoomCard/RoomCard.props";

export interface ImageProps {
    id: number;
    room_id: number;
    name: string;
    path: string;
    url: string | null;
}

export interface RoomProps {
    id: number;
    num: number;
    nb_lits: number;
    building_id: number;
    floor: number;
    surface: number;
    view: view;
    balcony: boolean;
    images: ImageProps[];
}

export default function Test() {
    return(
        <div className="flex flex-col gap-10">
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

            <div className="flex gap-4 px-6">
                <RoomCard
                    id={1}
                    num={101}
                    building_id={1}
                    floor={1}
                    surface={35}
                    view="mountains"
                    balcony={true}
                    images={[
                        {
                            id: 1,
                            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbGV0JTIwbW91bnRhaW5zfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
                            room_id: 1,
                            name: "image1",
                            path: "/images/image1.jpg"
                        },
                        {
                            id: 2,
                            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbGV0JTIwbW91bnRhaW5zfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
                            room_id: 1,
                            name: "image2",
                            path: "/images/image2.jpg"
                        },
                    ]}
                    nb_lits={4}
                />

                <RoomCard
                    id={2}
                    num={102}
                    building_id={1}
                    floor={1}
                    surface={35}
                    view="parking"
                    balcony={false}
                    images={[
                        {
                            id: 3,
                            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhbGV0JTIwbW91bnRhaW5zfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
                            room_id: 2,
                            name: "image3",
                            path: "/images/image3.jpg"
                        },
                    ]}
                    nb_lits={2}
                />  
            </div>
        </div>
    )
}