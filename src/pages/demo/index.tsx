import NavMenu, {MenusProp} from "./components/NavMenu/NavMenu";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import {useEffect, useState} from "react";
import "./index.css";


function Demo() {
    const [data, setData] = useState<MenusProp[]>([]);

    useEffect(() => {
        fetch("../config.json").then(data => data.json()).then((data) => {
            setData(data);
        });
    }, [])

    return (
        <div className="demo">
            <div className="menu">
                <NavMenu menus={data}></NavMenu>
            </div>
            <div className="content">
                <CodeEditor></CodeEditor>
            </div>
        </div>
    )
}

export default Demo;
