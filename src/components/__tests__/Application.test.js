import React from "react";
import axios from 'axios';

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText,
  queryByText, 
  getAllByTestId, 
  getByAltText, 
  getByPlaceholderText
} from "@testing-library/react";

import Application from "../Application";

describe('Application', () => {

  beforeEach(() => {
    cleanup();
    axios.initFixtures();
  });
  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const {getByText} = render(<Application />);
    return waitForElement(() => getByText('Monday'))
      .then(() => {
        fireEvent.click(getByText('Tuesday'))
        expect(getByText('Leopold Silvers')).toBeInTheDocument()
      })
      .catch(err => console.log(err));
  });
  
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const {container} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'));
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(() => getByText(appointment, 'Are you sure you would like to delete?'));
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, 'Add'));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'))
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Bob Smith' }
    })
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Bob Smith"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    const {container} = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error occurred: could not save"));
    expect(getByText(appointment, 'Error occurred: could not save')).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, 'Close'));
    await waitForElement(() => getByPlaceholderText(appointment, /enter student name/i));
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment').find(appointment => queryByText(appointment, 'Archie Cohen'));
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(() => getByText(appointment, 'Are you sure you would like to delete?'));
    axios.delete.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error occurred: could not delete"));
    expect(getByText(appointment, 'Error occurred: could not delete')).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, 'Close'));
    await waitForElement(() => getByText(appointment, 'Archie Cohen'));
    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
  });
})


