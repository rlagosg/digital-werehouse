import { AliasToken } from 'antd/es/theme/internal';
import { create } from 'zustand';

interface ThemeState {
  isDarck: boolean;
  themeDarck: Partial<AliasToken>;
  themeLight: Partial<AliasToken>;
  setIsDarck: (isAdmin: boolean) => void;
}

export const useModeTheme = create<ThemeState>((set) => ({
    isDarck: false,
    themeDarck: {
      colorBgBase: '#24303F',
      colorBgContainer: '#1D2A39',
      colorText: 'white',
      colorPrimary: '#3c50e0', // Ajuste para el color primario
      colorPrimaryHover: '#5a73e0', // Ajuste para el hover
      colorBgTextHover: '#5a73e0', // Ajuste para el color seleccionado
      colorBgBlur: '#1D2A39',
      colorBgContainerDisabled: '#1D2A39',
      colorBgElevated: '#1D2A39',
      colorBgLayout: '#1D2A39',
      colorBgMask: '#1D2A39',
      colorBgSpotlight: '#1D2A39',
      colorBgTextActive: '#1D2A39',
      
      colorBorder: '#3D4D60', //color de borde
      colorBorderBg: '#1D2A39',
      colorBorderSecondary: '#3c50e0',
      colorFill: '#3c50e0',
      colorFillAlter: '#1D2A39',
      colorFillContent: '#3c50e0',
      colorFillContentHover: '#5a73e0',
      colorFillQuaternary: '#1D2A39',
      colorFillSecondary: '#3c50e0',
      colorFillTertiary: '#3c50e0', // hover del mouse
      colorTextTertiary: 'white',
      colorTextSecondary: 'white',
      colorTextQuaternary: 'white',
      colorErrorTextHover: '#ff4d4f',
      colorHighlight: '#3c50e0',
      colorIcon: 'white',
      colorIconHover: '#5a73e0',
      colorInfo: '#3c50e0',
      colorInfoActive: '#5a73e0',
      colorInfoBg: '#1D2A39',
      colorInfoBgHover: '#5a73e0',
      colorInfoBorder: '#3c50e0',
      colorInfoBorderHover: '#5a73e0',
      colorInfoHover: '#5a73e0',
      colorSuccessBorderHover: '#52c41a',
      colorSuccessBorder: '#52c41a',
      colorSuccessText: '#52c41a',
      colorSuccessTextActive: '#6abe45',
      colorSuccessTextHover: '#6abe45',
      colorTextBase: 'white',
      colorTextDescription: '#8c8c8c',
      colorTextDisabled: '#595959',
      colorTextHeading: 'white',
      colorTextLabel: 'white',
      colorTextLightSolid: 'white',
      colorTextPlaceholder: '#8c8c8c',
      colorPrimaryBgHover: '#5a73e0',
      colorPrimaryBorder: '#3c50e0',
      colorPrimaryBorderHover: '#5a73e0',
      colorPrimaryText: 'white',
      colorPrimaryTextActive: 'white',
      colorPrimaryTextHover: 'white',
      colorSplit: '#3c50e0',
      colorSuccess: '#52c41a',
      colorSuccessActive: '#6abe45',
      colorSuccessBg: '#1D2A39',
      colorSuccessBgHover: '#5a73e0',
      colorInfoText: 'white',
      colorInfoTextActive: 'white',
      colorInfoTextHover: 'white',
      colorLink: '#3c50e0',
      colorLinkActive: '#5a73e0',
      colorLinkHover: '#5a73e0',
      colorPrimaryActive: '#5a73e0', // #5a73e0 no
      colorPrimaryBg: '#3CA4E0', // color de seleccion de item y rango
      colorSuccessHover: '#6abe45',
      colorWarning: '#faad14',
      colorWarningActive: '#ffc53d',
      colorWarningBg: '#1D2A39',
      borderRadius: 3
    },

    themeLight: {
      colorBorder: '#E2E8F0', //color de borde
      borderRadius: 3,
    },


    setIsDarck: (isDarck) => set({ isDarck }),
}));