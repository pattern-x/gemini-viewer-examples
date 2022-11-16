import "./CodeEditor.css"
import {EditorState} from "@codemirror/state";
import {basicSetup, EditorView} from "codemirror";
import {keymap} from "@codemirror/view";
import {indentWithTab} from "@codemirror/commands";
import {autocompletion} from "@codemirror/autocomplete";
import {sublime} from "@uiw/codemirror-theme-sublime";
import {javascript} from "@codemirror/lang-javascript";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from "antd";
import {useEffect, useRef, useState} from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { titleState, urlState, collapsedState } from "../../../../store/store";

let startLeft = 0;
function CodeEditor() {
    const [data, setData] = useState<string>();
    const moving = useRef(false);
    const codeBoxRef = useRef<HTMLDivElement>(null);
    const view = useRef<EditorView>();
    const iframeRef = useRef<HTMLIFrameElement>();
    const url = useRecoilValue<string>(urlState);
    const title = useRecoilValue<string>(titleState);
    const [collapsed, setCollapsed] = useRecoilState<boolean>(collapsedState);

    const getCode = (url: string) => {
        if (!url) return;
        fetch(url, {mode: 'cors'}).then(data => data.text()).then((data) => {
            loadCode(data);
            setData(data);
            run();
        })
    }

    const loadCode = (code: string) => {
        const state = EditorState.create({
            doc: code,
            extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                autocompletion(),
                sublime,
                javascript(),
            ]
        });
        const tab = document.querySelector("#htmlEdit") as Element;
        if (view.current) {
            view.current.setState(state);
        } else {
            view.current = new EditorView({state, parent: tab});
        }
    }

    const run = () => {
        const preview = document.querySelector("#preview") as HTMLElement;
        preview.innerHTML = "";
        iframeRef.current = document.createElement("iframe") as HTMLIFrameElement;
        preview.appendChild(iframeRef.current);
        const code = view.current?.state.doc.toString();
        if(code) {
            iframeRef.current.contentWindow?.document.open();
            iframeRef.current.contentWindow?.document.write(code);
            iframeRef.current.contentWindow?.document.close();
        }
    }

    const refresh = () => {
        if (data) {
            loadCode(data);
            run();
        }
    }

    const toggleCollapsed= () => {
        setCollapsed(!collapsed);
    }

    const handleMousesDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        moving.current = true;
        startLeft = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (moving.current) {
            let clientX = e.clientX;
            if (iframeRef.current && e.view === iframeRef.current.contentWindow) {
                const offsetX = iframeRef.current.getBoundingClientRect().x;
                clientX += offsetX;
            }
            const width = clientX - startLeft;
            const editor = codeBoxRef.current as HTMLElement;
            editor.style.width = `${editor.offsetWidth + width}px`;
            startLeft = clientX;
        }
    };

    const handleMouseUp = () => {
        moving.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [])

    useEffect(() => {
        if (!iframeRef.current) return;
        iframeRef.current.onload = () => {
            iframeRef.current?.contentWindow?.addEventListener('mousemove', handleMouseMove);
            iframeRef.current?.contentWindow?.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            iframeRef.current?.contentWindow?.removeEventListener('mousemove', handleMouseMove);
            iframeRef.current?.contentWindow?.removeEventListener('mouseup', handleMouseUp);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [iframeRef.current])

    useEffect(() => {
        getCode(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    return (
        <div className="code-editor">
            <div className="code-box" ref={codeBoxRef}>
                <div className="control">
                    <Button type="primary" onClick={toggleCollapsed} style={{ height: "100%", marginRight: 16 }}>
                        {!collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <span id="resetCode" className="btn" onClick={refresh}>刷新</span>
                    <span id="runCode" className="btn" onClick={run}>运行</span>
                    <span className="code-title">{title}</span>
                </div>
                <div id="htmlEdit" className="editor-box"></div>
            </div>
            <div className="splitter" onMouseDown={handleMousesDown}></div>
            <div className="view-box" id="preview"></div>
        </div>
    )
}

export default CodeEditor