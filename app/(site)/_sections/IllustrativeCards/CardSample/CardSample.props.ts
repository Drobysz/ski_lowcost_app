export type IconName = 'currency' | 'family' | 'pass';

export interface ColorType {
    t_col: string;
    b_col: string;
}

export type CardSampleProps = {
  icon: IconName;
  title: string;
  text: string;
  text_color?: string;
  back_color?: string;
};