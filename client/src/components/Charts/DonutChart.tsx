import { ResponsiveContainer, PieChart, Pie, Legend, Cell, Tooltip } from "recharts";
import { Item, Tag } from "../../types/types";
import { useEffect, useState } from "react";
import randomColor from "randomcolor";

type ResponseData = Item[];

interface ChartProps {
    items: ResponseData | undefined;
    property: string;
    title: string;
}

interface DataCount {
    name: string;
    value: number;
}

const DonutChart: React.FC<ChartProps> = ({ items, property, title }) => {
    const [dataCountArray, setDataCountArray] = useState<DataCount[]>([]);
    const [currentColorsArray, setCurrentColorsArray] = useState<string[]>([]);

    const createDataCountArray = (items: object[], property: string): Array<{ name: string; value: number }> => {
        const dataCount = new Map<string, number>();

        console.log('items for donut chart:', (items));

        for (const item of items) {
            if (property in item) {
                const dataObjects = (item as Record<string, unknown>)[property] as Tag[];
                console.log(`dataObjects for item ${JSON.stringify(item)}: ${JSON.stringify(dataObjects)}`);
                for (const datum of dataObjects) {
                    console.log(`Processing datum: ${JSON.stringify(datum)}`);
                    const count = dataCount.get(datum.name) || 0;
                    dataCount.set(datum.name, count + 1);
                }
            }
        }
        console.log(`dataCount: ${JSON.stringify(Array.from(dataCount, ([name, value]) => ({ name, value })))}`);
        return Array.from(dataCount, ([name, value]) => ({ name, value }));
    };

    const generateColorsArray = (X: number): string[] => {
        const colorsArray: string[] = randomColor({ count: X, luminosity: "bright" });

        // for (let i = 0; i < X; i++) {
        //     const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        //     colorsArray.push(color);
        // }
        
        console.log(colorsArray);
        return colorsArray;
    };

    useEffect(() => {
        console.log('Donut Chart:', items);
        setDataCountArray(createDataCountArray(items || [], property));
    }, [items, property]);

    useEffect(() => {
        setCurrentColorsArray(generateColorsArray(dataCountArray.length));
    }, [dataCountArray]);

    return (
        <div className="col-xl-6">
            <div className="card">
                <div className="card-header">
                    <h5>{title}</h5>
                </div>
                <div className="card-block">
                    <div id="morris-donut-chart">
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart>
                                <Pie
                                    data={dataCountArray}
                                    dataKey='value'
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={40}
                                    paddingAngle={2}
                                    fill="#8884d8"
                                    label
                                >
                                    {dataCountArray.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={currentColorsArray[index % currentColorsArray.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <br />
                                <br />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DonutChart;