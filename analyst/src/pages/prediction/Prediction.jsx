import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./prediction.scss";

const Prediction = () => {
    return (
        <div className="prediction">
            <Sidebar />
            <div className="predictionContainer">
                <Navbar />
                <div className="top">
                    <h1>Input for Prediction</h1>
                </div>

                <div className="bottom">
                    <div className="left"></div>
                    <div className="right">
                        <div className="formInput">
                            <label htmlFor="">system.diskio.iostat.await</label>
                            <input type="text" />
                        </div>
                        <div className="formInput">
                            <label htmlFor="">
                                system.diskio.iostat.queue.avg_size
                            </label>
                            <input type="text" />
                        </div>
                        <div className="formInput">
                            <label htmlFor="">
                                system.diskio.iostat.read.per_sec.bytes
                            </label>
                            <input type="text" />
                        </div>
                        <div className="formInput">
                            <label htmlFor="">
                                system.diskio.iostat.write.per_sec.bytes
                            </label>
                            <input type="text" />
                        </div>

                        <button>Insert & Predict</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prediction;
