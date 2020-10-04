import React, { useEffect } from "react";
import { resType } from "../../index";
import Name from "../Name/Name";
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../store/Notes/actions";
import { initialState } from "../../store/Notes/reducer";

type AppProps = resType;

const App: React.FC<AppProps> = ({ text, value, isReady, name }) => {
  const dispatch = useDispatch();

  const test = useSelector((state: typeof initialState) => state.data.isTest)

  useEffect(() => {
    console.log("mount");
    dispatch(getRequest('26'))
  }, []);

  return (
    <div>
      <div className="bigData__block">{text}</div>
      <div>{value}</div>
      {isReady && <Name name={name} />}
    </div>
  );
};

export default App;
