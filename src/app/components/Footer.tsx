import { DateTime } from 'luxon';

export function Footer() {
  return (
    <footer>
      Quester's Run &copy; {DateTime.now().year}
    </footer>
  );
}