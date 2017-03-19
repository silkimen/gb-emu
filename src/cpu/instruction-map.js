/* eslint-disable lines-around-comment */

import * as ops from './operation/operation';

export default [
  // 0x00
  ops.NOOP, ops.LD_BC_d16, ops.LD_BC_A, ops.INC_BC,
  // 0x04
  ops.INC_B, ops.DEC_B, ops.LD_B_d8, ops.RLCA,
  // 0x08
  ops.LD_a16_SP, ops.ADD_HL_BC, ops.LD_A_BC, ops.DEC_BC,
  // 0x0C
  ops.INC_C, ops.DEC_C, ops.LD_C_d8, ops.RRCA,

  // 0x10
  ops.STOP, ops.LD_DE_d16, ops.LD_DE_A, ops.INC_DE,
  // 0x14
  ops.INC_D, ops.DEC_D, ops.LD_D_d8, ops.RLA,
  // 0x18
  ops.JR_r8, ops.ADD_HL_DE, ops.LD_A_DE, ops.DEC_DE,
  // 0x1C
  ops.INC_E, ops.DEC_E, ops.LD_E_d8, ops.RRA,

  // 0x20
  ops.JR_NZ_r8, ops.LD_HL_d16, ops.LD_HLp_A, ops.INC_HL,
  // 0x24
  ops.INC_H, ops.DEC_H, ops.LD_H_d8, ops.DAA,
  // 0x28
  ops.JR_Z_r8, ops.ADD_HL_HL, ops.LD_A_HLp, ops.DEC_HL,
  // 0x2C
  ops.INC_L, ops.DEC_L, ops.LD_L_d8, ops.CPL,

  // 0x30
  ops.JR_NC_r8, ops.LD_SP_d16, ops.LD_HLm_A, ops.INC_SP,
  // 0x34
  ops.INC_$HL, ops.DEC_$HL, ops.LD_HL_d8, ops.SCF,
  // 0x38
  ops.JR_C_r8, ops.ADD_HL_SP, ops.LD_A_HLm, ops.DEC_SP,
  // 0x3C
  ops.INC_A, ops.DEC_A, ops.LD_A_d8, ops.CCF,

  // 0x40
  ops.LD_B_B, ops.LD_B_C, ops.LD_B_D, ops.LD_B_E,
  // 0x44
  ops.LD_B_H, ops.LD_B_L, ops.LD_B_HL, ops.LD_B_A,
  // 0x48
  ops.LD_C_B, ops.C_C, ops.LD_C_D, ops.LD_C_E,
  // 0x4C
  ops.LD_C_H, ops.LD_C_L, ops.LD_C_HL, ops.LD_C_A,

  // 0x50
  ops.LD_D_B, ops.LD_D_C, ops.LD_D_D, ops.LD_D_E,
  // 0x54
  ops.LD_D_H, ops.LD_D_L, ops.LD_D_HL, ops.LD_D_A,
  // 0x58
  ops.LD_E_B, ops.LD_E_C, ops.LD_E_D, ops.LD_E_E,
  // 0x5C
  ops.LD_E_H, ops.LD_E_L, ops.LD_E_HL, ops.LD_E_A,

  // 0x60
  ops.LD_H_B, ops.LD_H_C, ops.LD_H_D, ops.LD_H_E,
  // 0x64
  ops.LD_H_H, ops.LD_H_L, ops.LD_H_HL, ops.LD_H_A,
  // 0x68
  ops.LD_L_B, ops.LD_L_C, ops.LD_L_D, ops.LD_L_E,
  // 0x6C
  ops.LD_L_H, ops.LD_L_L, ops.LD_L_HL, ops.LD_L_A,

  // 0x70
  ops.LD_HL_B, ops.LD_HL_C, ops.LD_HL_D, ops.LD_HL_E,
  // 0x74
  ops.LD_HL_H, ops.LD_HL_L, ops.HALT, ops.LD_HL_A,
  // 0x78
  ops.LD_A_B, ops.LD_A_C, ops.LD_A_D, ops.LD_A_E,
  // 0x7C
  ops.LD_A_H, ops.LD_A_L, ops.LD_A_HL, ops.LD_A_A,

  // 0x80
  ops.ADD_A_B, ops.ADD_A_C, ops.ADD_A_D, ops.ADD_A_E,
  // 0x84
  ops.ADD_A_H, ops.ADD_A_L, ops.ADD_A_HL, ops.ADD_A_A,
  // 0x88
  ops.ADC_A_B, ops.ADC_A_C, ops.ADC_A_D, ops.ADC_A_E,
  // 0x8C
  ops.ADC_A_H, ops.ADC_A_L, ops.ADC_A_HL, ops.ADC_A_A,

  // 0x90
  ops.SUB_B, ops.SUB_C, ops.SUB_D, ops.SUB_E,
  // 0x94
  ops.SUB_H, ops.SUB_L, ops.SUB_HL, ops.SUB_A,
  // 0x98
  ops.SBC_A_B, ops.SBC_A_C, ops.SBC_A_D, ops.SBC_A_E,
  // 0x9C
  ops.SBC_A_H, ops.SBC_A_L, ops.SBC_A_HL, ops.SBC_A_A,

  // 0xA0
  ops.AND_B, ops.AND_C, ops.AND_D, ops.AND_E,
  // 0xA4
  ops.AND_H, ops.AND_L, ops.AND_HL, ops.AND_A,
  // 0xA8
  ops.XOR_B, ops.XOR_C, ops.XOR_D, ops.XOR_E,
  // 0xAC
  ops.XOR_H, ops.XOR_L, ops.XOR_HL, ops.XOR_A,

  // 0xB0
  ops.OR_B, ops.OR_C, ops.OR_D, ops.OR_E,
  // 0xB4
  ops.OR_H, ops.OR_L, ops.OR_HL, ops.OR_A,
  // 0xB8
  ops.CP_B, ops.CP_C, ops.CP_D, ops.CP_E,
  // 0xBC
  ops.CP_H, ops.CP_L, ops.CP_HL, ops.CP_A,

  // 0xC0
  ops.RET_NZ, ops.POP_BC, ops.JP_NZ_a16, ops.JP_a16,
  // 0xC4
  ops.CALL_NZ_a16, ops.PUSH_BC, ops.ADD_A_d8, ops.RST_00h,
  // 0xC8
  ops.RET_Z, ops.RET, ops.JP_Z_a16, ops.PREFIX_CB,
  // 0xCC
  ops.CALL_Z_a16, ops.CALL_a16, ops.ADC_A_d8, ops.RST_08h,

  // 0xD0
  ops.RET_NC, ops.POP_DE, ops.JP_NC_a16, ops.INVALID,
  // 0xD4
  ops.CALL_NC_a16, ops.PUSH_DE, ops.SUB_d8, ops.RST_10h,
  // 0xD8
  ops.RET_C, ops.RETI, ops.JP_C_a16, ops.INVALID,
  // 0xDC
  ops.CALL_C_a16, ops.INVALID, ops.SBC_A_d8, ops.RST18h,

  // 0xE0
  ops.LD_$a8_A, ops.POP_HL, ops.LD_$C_A, ops.INVALID,
  // 0xE4
  ops.INVALID, ops.PUSH_HL, ops.AND_d8, ops.RST_20h,
  // 0xE8
  ops.ADD_SP_r8, ops.JP_HL, ops.LD_a16_A, ops.INVALID,
  // 0xEC
  ops.INVALID, ops.INVALID, ops.XOR_d8, ops.RST_28h,

  // 0xF0
  ops.LD_A_$a8, ops.POP_AF, ops.LD_A_$C, ops.DI,
  // 0xF4
  ops.INVALID, ops.PUSH_AF, ops.OR_d8, ops.RST_30h,
  // 0xF8
  ops.LD_HL_SPpr8, ops.LD_SP_HL, ops.LD_A_a16, ops.EI,
  // 0xFC
  ops.INVALID, ops.INVALID, ops.CP_d8, ops.RST_38h
];
