package SniffStep.service;

import SniffStep.common.jwt.JwtTokenProvider;
import SniffStep.common.jwt.dto.TokenDTO;
import SniffStep.common.jwt.dto.TokenRequestDTO;
import SniffStep.common.jwt.entity.RefreshToken;
import SniffStep.dto.auth.SignUpRequestDTO;
import SniffStep.dto.member.MemberRequestDTO;
import SniffStep.entity.Member;
import SniffStep.entity.MemberRole;
import SniffStep.repository.MemberRepository;
import SniffStep.repository.RefreshTokenRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    @Transactional
    public void signup(SignUpRequestDTO signUpRequestDTO) {
        validateSignUpInfo(signUpRequestDTO);
        Member member = createSignupFormOfUser(signUpRequestDTO);
        memberRepository.save(member);
    }

    private Member createSignupFormOfUser(SignUpRequestDTO signUpRequestDTO) {
        Member member = Member.builder()
                .email(signUpRequestDTO.getEmail())
                .password(encoder.encode(signUpRequestDTO.getPassword()))
                .name(signUpRequestDTO.getName())
                .nickname(signUpRequestDTO.getNickname())
                .introduce(signUpRequestDTO.getIntroduce())
                .phoneNumber(signUpRequestDTO.getPhoneNumber())
                .role(MemberRole.USER)
                .build();
        return member;
    }

    private void validateSignUpInfo(SignUpRequestDTO signUpRequestDTO) {
        if (memberRepository.existsByEmail(signUpRequestDTO.getEmail())) {
            throw new RuntimeException("Already existed email");
        }
    }

    @Transactional
    public TokenDTO login(MemberRequestDTO memberRequestDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDTO.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDTO tokenDto = jwtTokenProvider.generateTokenDto(authentication);

        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        return tokenDto;
    }

    @Transactional
    public TokenDTO reissue(TokenRequestDTO tokenRequestDTO) {
        //1. 리프레쉬 토큰 검증
        if (!jwtTokenProvider.validateToken(tokenRequestDTO.getRefreshToken())) {
            throw new RuntimeException("Don`t existed refresh token");
        }

        //2. 액세스 토큰에서 멤버 ID 가져오기
        Authentication authentication = jwtTokenProvider.getAuthentication(tokenRequestDTO.getRefreshToken());

        //3. 저장소에서 멤버 ID 기반으로 리프레쉬 토큰 값 가져오기
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Already logged out user"));

        //4. 리프레쉬 토큰 일치 여부 확인
        if (!refreshToken.getValue().equals(tokenRequestDTO.getRefreshToken())) {
            throw new RuntimeException("Different info between user and refresh token");
        }

        //5. 새로운 토큰 생성
        TokenDTO tokenDto = jwtTokenProvider.generateTokenDto(authentication);

        //6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        //7. create Token
        return tokenDto;
    }

}
