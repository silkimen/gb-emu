/**
 * Gameboy CPU (Sharp LR35902)
 */

const registers = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  h: 0,
  l: 0,
  sp: 0,
  pc: 0
};

const ops = {

};

const map = [
  // 0x00
  ops.NOP, ops.LD_BC_d16, ops.LD_BC_A, ops.INC_BC,
  // 0x04
  ops.INC_B, ops.DEC_B, ops.LD_B_d8, ops.RLCA,
  // 0x08
  ops.LD_a16_SP, ops.ADD_HL_BC, ops.LD_A_BC, ops.DEC_BC,
  // 0x0C
  ops.INC_C, ops.DEC_C, ops.LD_C_d8, ops.RRCA,

  // 0x10
  ops.STOP, ops.LD_DE_d16, ops.LD_DE_A, ops.INC_DE
  // 0x14
  ops.INC_D, ops.DEC_D, ops.LD_D_d8, ops.RLA,
  // 0x18
  ops.JR_r8, ops.ADD_HL_DE, ops.LD_A_DE, ops.DEC_DE
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
  ops.INC_HL, ops.DEC_HL, ops.LD_HL_d8, ops.SCF,
  // 0x38
  ops.JR_C_r8, ops.ADD_HL_SP, ops.LD_A_HLm, ops.DEC_SP,
  // 0x3C
  ops.INC_A, ops.DEC_A, ops.LD_A_d8, ops.CCF,

  // 0x40
  ops.LD_B_B, ops.LD_B_C, ops.LD_B_D, ops.LD_B_E
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
  ops.LD_HL_B, ops.LD_HL_C, ops.LD_HL_D, ops.LD_HL_E
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
  ops.LDH_a8_A, ops.POP_HL, ops.LD_C_A, ops.INVALID,
  // 0xE4
  ops.INVALID, ops.PUSH_HL, ops.AND_d8, ops.RST_20h,
  // 0xE8
  ops.ADD_SP_r8, ops.JP_HL, ops.LD_a16_A, ops.INVALID,
  // 0xEC
  ops.INVALID, ops.INVALID, ops.XOR_d8, ops.RST_28h,

  // 0xF0
  ops.LDH_A_a8, ops.POP_AF, ops.LD_A_C, ops.DI,
  // 0xF4
  ops.INVALID, ops.PUSH_AF, ops.OR_d8, ops.RST_30h,
  // 0xF8
  ops.LD_HL_SPpr8, ops.LD_SP_HL, ops.LD_A_a16, ops.EI,
  // 0xFC
  ops.INVALID, ops.INVALID, ops.CP_d8, ops.RST_38h
];

const cb_map = [
  // 0x00
  ops.RLC_B, ops.RLC_C, ops.RLC_D, ops.RLC_E,
  // 0x04
  ops.RLC_H, ops.RLC_L, ops.RLC_HL, ops.RLC_A,
  // 0x08
  ops.RRC_B, ops.RRC_C, ops.RRC_D, ops.RRC_E,
  // 0x0C
  ops.RRC_H, ops.RRC_L, ops.RRC_HL, ops.RRC_A,

  // 0x10
  ops.RL_B, ops.RL_C, ops.RL_D, ops.RL_E
  // 0x14
  ops.RL_H, ops.RL_L, ops.RL_HL, ops.RL_A,
  // 0x18
  ops.RR_B, ops.RR_C, ops.RR_D, ops.RR_E
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
  ops.BIT_0_B, ops.BIT_0_C, ops.BIT_0_D, ops.BIT_0_E
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
  ops.BIT_6_B, ops.BIT_6_C, ops.BIT_6_D, ops.BIT_6_E
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
