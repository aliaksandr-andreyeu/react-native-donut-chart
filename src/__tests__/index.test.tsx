import TestRenderer, { ReactTestInstance, ReactTestRenderer, act } from 'react-test-renderer';
import { DonutChart } from '../index';
import { DonutChartProps } from '../types';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// react-native and react-native-svg are mocked to plain host components so the
// component can render under jest's node test environment without the full RN
// runtime / native modules.
jest.mock('react-native', () => ({
  StyleSheet: { create: (styles: Record<string, unknown>) => styles },
  View: 'View'
}));

jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Circle: 'Circle',
  G: 'G'
}));

const renderChart = (props: DonutChartProps): ReactTestInstance => {
  let renderer: ReactTestRenderer;
  act(() => {
    renderer = TestRenderer.create(<DonutChart {...props} />);
  });
  return renderer!.root;
};

const getCircles = (root: ReactTestInstance): ReactTestInstance[] =>
  root.findAll((node) => (node.type as unknown as string) === 'Circle');

describe('DonutChart', () => {
  describe('empty state', () => {
    it('renders a single ring with fill="none" (no black disk)', () => {
      const circles = getCircles(renderChart({ slices: [] }));
      expect(circles).toHaveLength(1);
      expect(circles[0].props.fill).toBe('none');
    });

    it('uses the provided emptyColor for the ring', () => {
      const circles = getCircles(renderChart({ slices: [], emptyColor: '#E0E0E0' }));
      expect(circles[0].props.stroke).toBe('#E0E0E0');
    });
  });

  describe('with slices', () => {
    const slices = [
      { percentage: 50, color: '#FF0000' },
      { percentage: 50, color: '#00FF00' }
    ];

    it('renders a circle per slice and gap with no filled center', () => {
      const circles = getCircles(renderChart({ slices }));
      expect(circles.length).toBeGreaterThanOrEqual(slices.length);
      circles.forEach((circle) => expect(circle.props.fill).toBe('none'));
    });

    it('passes the slice colors through to the strokes', () => {
      const strokes = getCircles(renderChart({ slices })).map((circle) => circle.props.stroke);
      expect(strokes).toContain('#FF0000');
      expect(strokes).toContain('#00FF00');
    });
  });

  describe('invalid input', () => {
    it('degrades to the empty ring instead of throwing', () => {
      let root: ReactTestInstance | undefined;
      expect(() => {
        root = renderChart({ slices: [{ percentage: -10 }] });
      }).not.toThrow();
      const circles = getCircles(root as ReactTestInstance);
      expect(circles).toHaveLength(1);
      expect(circles[0].props.fill).toBe('none');
    });
  });
});
