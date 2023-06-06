import { render, screen } from '@testing-library/react'
import Landing from '../src/app/(preauth)/page.tsx'
import '@testing-library/jest-dom'

describe('Landing', () => {
  it('renders a Landing Page', () => {
    render(<Landing />);

    // Check if the logo image is present
    const logoImage = screen.getByAltText('kafkaPRAAG logo');
    expect(logoImage).toBeInTheDocument();

    // Check if the description text is present
    const descriptionText = screen.getByText(/Your Apache Kafka health and performance visualizer/i);
    expect(descriptionText).toBeInTheDocument();

    // Check if the authenticate button is present
    const authenticateButton = screen.getByRole('button', { name: /authenticate/i });
    expect(authenticateButton).toBeInTheDocument();
  });
});