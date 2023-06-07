import { render, screen, act } from '../node_modules/@testing-library/react'
import '../node_modules/@testing-library/jest-dom'
import Landing from '../src/app/(preauth)/page.tsx'
import OverallMetrics from '../src/app/(postauth)/overall/page.tsx'
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

describe('Landing Page', () => {
  it('renders Logo Image and Authenticate Button', () => {
    render(<Landing />)

    // Check if the logo image is present
    const logoImage = screen.getByAltText('kafkaPRAAG logo')
    expect(logoImage).toBeInTheDocument()

    // Check if the authenticate button is present
    const authenticateButton = screen.getByRole('button', { name: /authenticate/i })
    expect(authenticateButton).toBeInTheDocument()
  })
})

describe('OverallMetrics', () => {
  beforeEach(() => {
    fetch.resetMocks(); // Resets the fetch mock between tests
  });

  it('renders overall page with producer-testing components', async () => {
    fetch.mockResponseOnce(JSON.stringify({ producerList: [] }));
    render(<OverallMetrics />);

    await act(async () => {
      render(<OverallMetrics />);
    });

    const producerTestingElements = screen.getAllByTestId('producer-testing');
    producerTestingElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('renders stats component', async () => {
    fetch.mockResponseOnce(JSON.stringify({ producerList: [] }));
    render(<OverallMetrics />);

    await act(async () => {
      render(<OverallMetrics />);
    });

    const statsComponents = screen.getAllByTestId('stats');

    statsComponents.forEach((statsComponent) => {
      expect(statsComponent).toBeInTheDocument();
      // Additional assertions for each stats component
    });
  });

  it('renders Graph components', async () => {
    fetch.mockResponseOnce(JSON.stringify({ producerList: [] }));
    render(<OverallMetrics />);

    await act(async () => {
      render(<OverallMetrics />);
    });

    const graphsComponents = screen.getAllByTestId('graphs');
    expect(graphsComponents.length).toBeGreaterThan(0); // Assert that at least one graphs component is found

    graphsComponents.forEach((graphsComponent) => {
      expect(graphsComponent).toBeInTheDocument();
    });
  });

  it('renders AddressInput components', async () => {
    fetch.mockResponseOnce(JSON.stringify({ producerList: [] }));
    render(<OverallMetrics />);

    await act(async () => {
      render(<OverallMetrics />);
    });

    const AddressInputComponents = screen.getAllByTestId('AddressInput');
    expect(AddressInputComponents.length).toBeGreaterThan(0); 

    AddressInputComponents.forEach((AddressInputComponent) => {
      expect(AddressInputComponent).toBeInTheDocument();
    });
  });



});
