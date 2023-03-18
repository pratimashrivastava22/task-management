import { render } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from './App';

const AllTheProviders = ({ children }) => {
    return (
        <BrowserRouter >
            <App>
                {children}
            </App>
        </BrowserRouter>
    )
}

const customRender = (ui, options) => {
    if (options?.route)
        window.history.pushState({}, 'Test page', options.route)
    return render(ui, { wrapper: AllTheProviders, ...options })
}
// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

