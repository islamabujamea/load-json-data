import exportedData from "./productData.json";
import "./App.css";

export const Stocks = () => {
    return (
        <>
            <div className="stock-container">
                {exportedData.data.map((data, key) => {
                    return (
                        <div key={key}>
                            {data.product_name +
                                " , " +
                                data.weight +
                                " ," +
                                data.availability +
                                ", " +
                                data.price_tier}
                        </div>
                    );
                })}

            </div>
        </>
    );
};