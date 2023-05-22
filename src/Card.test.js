import React from "react";
import { render } from "@testing-library/react";
import Card from './Card';
import image1 from "./image1.jpg";
// smoke test
test('it render without crashing', () => {
    render(<Card caption ="Hawaii island" src = {image1} currNum = {1} totalNum = {3}/>)
});
//snapshot test
test('it match snapshot', () => {
    const { asFragment } = render(
      <Card caption="Hawaii island" src={image1} currNum={1} totalNum={3} />
    );
    expect(asFragment()).toMatchSnapshot();
})