import { render, screen } from '@testing-library/react';
import MyApp from "./MyApp";

test('CBApp renders Minecraft server', () => {
  render(<MyApp />);
  const linkElement = screen.getByText(/Minecraft Serveur/i);
  expect(linkElement).toBeInTheDocument();
});
