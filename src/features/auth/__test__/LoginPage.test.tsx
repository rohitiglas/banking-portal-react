import {render,screen} from '@testing-library/react'
import LoginPage from '../pages/LoginPage'
import userEvent from '@testing-library/user-event';

describe("LoginPage",()=>{
    it("render login page",()=>{
        render(<LoginPage/>);
        expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    });
    it("show validation errors",async ()=>{
        render(<LoginPage/>);
       const button=screen.getByRole("button",{name:/login/i});
       await userEvent.click(button);
       expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    })
})