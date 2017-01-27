import * as ops from './operation';

export const cbMap = [
  // 0x00
  ops.RLC_B, ops.RLC_C, ops.RLC_D, ops.RLC_E,
  // 0x04
  ops.RLC_H, ops.RLC_L, ops.RLC_HL, ops.RLC_A,
  // 0x08
  ops.RRC_B, ops.RRC_C, ops.RRC_D, ops.RRC_E,
  // 0x0C
  ops.RRC_H, ops.RRC_L, ops.RRC_HL, ops.RRC_A,

  // 0x10
  ops.RL_B, ops.RL_C, ops.RL_D, ops.RL_E,
  // 0x14
  ops.RL_H, ops.RL_L, ops.RL_HL, ops.RL_A,
  // 0x18
  ops.RR_B, ops.RR_C, ops.RR_D, ops.RR_E,
  // 0x1C
  ops.RR_H, ops.RR_L, ops.RR_HL, ops.RR_A,

  // 0x20
  ops.SLA_B, ops.SLA_C, ops.SLA_D, ops.SLA_E,
  // 0x24
  ops.SLA_H, ops.SLA_L, ops.SLA_HL, ops.SLA_A,
  // 0x28
  ops.SRA_B, ops.SRA_C, ops.SRA_D, ops.SRA_E,
  // 0x2C
  ops.SRA_H, ops.SRA_L, ops.SRA_HL, ops.SRA_A,

  // 0x30
  ops.SWAP_B, ops.SWAP_C, ops.SWAP_D, ops.SWAP_E,
  // 0x34
  ops.SWAP_H, ops.SWAP_L, ops.SWAP_HL, ops.SWAP_A,
  // 0x38
  ops.SRL_B, ops.SRL_C, ops.SRL_D, ops.SRL_E,
  // 0x3C
  ops.SRL_H, ops.SRL_L, ops.SRL_HL, ops.SRL_A,

  // 0x40
  ops.BIT_0_B, ops.BIT_0_C, ops.BIT_0_D, ops.BIT_0_E,
  // 0x44
  ops.BIT_0_H, ops.BIT_0_L, ops.BIT_0_HL, ops.BIT_0_A,
  // 0x48
  ops.BIT_1_B, ops.BIT_1_C, ops.BIT_1_D, ops.BIT_1_E,
  // 0x4C
  ops.BIT_1_H, ops.BIT_1_L, ops.BIT_1_HL, ops.BIT_1_A,

  // 0x50
  ops.BIT_2_B, ops.BIT_2_C, ops.BIT_2_D, ops.BIT_2_E,
  // 0x54
  ops.BIT_2_H, ops.BIT_2_L, ops.BIT_2_HL, ops.BIT_2_A,
  // 0x58
  ops.BIT_3_B, ops.BIT_3_C, ops.BIT_3_D, ops.BIT_3_E,
  // 0x5C
  ops.BIT_3_H, ops.BIT_3_L, ops.BIT_3_HL, ops.BIT_3_A,

  // 0x60
  ops.BIT_4_B, ops.BIT_4_C, ops.BIT_4_D, ops.BIT_4_E,
  // 0x64
  ops.BIT_4_H, ops.BIT_4_L, ops.BIT_4_HL, ops.BIT_4_A,
  // 0x68
  ops.BIT_5_B, ops.BIT_5_C, ops.BIT_5_D, ops.BIT_5_E,
  // 0x6C
  ops.BIT_5_H, ops.BIT_5_L, ops.BIT_5_HL, ops.BIT_5_A,

  // 0x70
  ops.BIT_6_B, ops.BIT_6_C, ops.BIT_6_D, ops.BIT_6_E,
  // 0x74
  ops.BIT_6_H, ops.BIT_6_L, ops.BIT_6_HL, ops.BIT_6_A,
  // 0x78
  ops.BIT_7_B, ops.BIT_7_C, ops.BIT_7_D, ops.BIT_7_E,
  // 0x7C
  ops.BIT_7_H, ops.BIT_7_L, ops.BIT_7_HL, ops.BIT_7_A,

  // 0x80
  ops.RES_0_B, ops.RES_0_C, ops.RES_0_D, ops.RES_0_E,
  // 0x84
  ops.RES_0_H, ops.RES_0_L, ops.RES_0_HL, ops.RES_0_A,
  // 0x88
  ops.RES_1_B, ops.RES_1_C, ops.RES_1_D, ops.RES_1_E,
  // 0x8C
  ops.RES_1_H, ops.RES_1_L, ops.RES_1_HL, ops.RES_1_A,

  // 0x90
  ops.RES_2_B, ops.RES_2_C, ops.RES_2_D, ops.RES_2_E,
  // 0x94
  ops.RES_2_H, ops.RES_2_L, ops.RES_2_HL, ops.RES_2_A,
  // 0x98
  ops.RES_3_B, ops.RES_3_C, ops.RES_3_D, ops.RES_3_E,
  // 0x9C
  ops.RES_3_H, ops.RES_3_L, ops.RES_3_HL, ops.RES_3_A,

  // 0xA0
  ops.RES_4_B, ops.RES_4_C, ops.RES_4_D, ops.RES_4_E,
  // 0xA4
  ops.RES_4_H, ops.RES_4_L, ops.RES_4_HL, ops.RES_4_A,
  // 0xA8
  ops.RES_5_B, ops.RES_5_C, ops.RES_5_D, ops.RES_5_E,
  // 0xAC
  ops.RES_5_H, ops.RES_5_L, ops.RES_5_HL, ops.RES_5_A,

  // 0xB0
  ops.RES_6_B, ops.RES_6_C, ops.RES_6_D, ops.RES_6_E,
  // 0xB4
  ops.RES_6_H, ops.RES_6_L, ops.RES_6_HL, ops.RES_6_A,
  // 0xB8
  ops.RES_7_B, ops.RES_7_C, ops.RES_7_D, ops.RES_7_E,
  // 0xBC
  ops.RES_7_H, ops.RES_7_L, ops.RES_7_HL, ops.RES_7_A,

  // 0xC0
  ops.SET_0_B, ops.SET_0_C, ops.SET_0_D, ops.SET_0_E,
  // 0xC4
  ops.SET_0_H, ops.SET_0_L, ops.SET_0_HL, ops.SET_0_A,
  // 0xC8
  ops.SET_1_B, ops.SET_1_C, ops.SET_1_D, ops.SET_1_E,
  // 0xCC
  ops.SET_1_H, ops.SET_1_L, ops.SET_1_HL, ops.SET_1_A,

  // 0xD0
  ops.SET_2_B, ops.SET_2_C, ops.SET_2_D, ops.SET_2_E,
  // 0xD4
  ops.SET_2_H, ops.SET_2_L, ops.SET_2_HL, ops.SET_2_A,
  // 0xD8
  ops.SET_3_B, ops.SET_3_C, ops.SET_3_D, ops.SET_3_E,
  // 0xDC
  ops.SET_3_H, ops.SET_3_L, ops.SET_3_HL, ops.SET_3_A,

  // 0xE0
  ops.SET_4_B, ops.SET_4_C, ops.SET_4_D, ops.SET_4_E,
  // 0xE4
  ops.SET_4_H, ops.SET_4_L, ops.SET_4_HL, ops.SET_4_A,
  // 0xE8
  ops.SET_5_B, ops.SET_5_C, ops.SET_5_D, ops.SET_5_E,
  // 0xEC
  ops.SET_5_H, ops.SET_5_L, ops.SET_5_HL, ops.SET_5_A,

  // 0xF0
  ops.SET_6_B, ops.SET_6_C, ops.SET_6_D, ops.SET_6_E,
  // 0xF4
  ops.SET_6_H, ops.SET_6_L, ops.SET_6_HL, ops.SET_6_A,
  // 0xF8
  ops.SET_7_B, ops.SET_7_C, ops.SET_7_D, ops.SET_7_E,
  // 0xFC
  ops.SET_7_H, ops.SET_7_L, ops.SET_7_HL, ops.SET_7_A
];
