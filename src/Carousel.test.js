import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
// smoke test
it("it render without crashing", () => {
    render(<Carousel />);
});
// snapshot test
it(" it matches snapshot", () => {
    const {asFragment} = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
})
// it("works when you click on the left arrow", function () {
//   const { queryByTestId, queryByAltText } = render(<Carousel />);

//   // expect the first image to show, but not the second
//   expect(
//     queryByAltText("Photo by Richard Pasquarella on Unsplash")
//   ).toBeInTheDocument();
//   const leftArrow = queryByTestId("left-arrow");
//   fireEvent.click(leftArrow);
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

// });


it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});
it("should hide left arrow on first image and right arrow on last image", () => {
  const { getByTestId, queryByTestId } = render(<Carousel />);
 // we cannot use getByTestId for left arrow, because it will throw error
 // queryByTestId will return null if nothing
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  // Initially, left arrow should be hidden, right arrow should be visible
  expect(leftArrow).toBeNull();
  expect(rightArrow).toBeVisible();

  // Clicking right arrow to move to the second image
  fireEvent.click(rightArrow);

  // After moving to the second image, left arrow should be visible, right arrow should still be visible
  expect(queryByTestId("left-arrow")).toBeVisible();// or.toBeInTheDocument();
  expect(rightArrow).toBeVisible();

  // Clicking left arrow to move back to the first image
  fireEvent.click(queryByTestId("left-arrow"));

  // After moving back to the first image, left arrow should be hidden again, right arrow should still be visible
  expect(queryByTestId("left-arrow")).toBeNull();
  expect(rightArrow).toBeVisible();
});