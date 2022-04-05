package com.b203.trou.service.user;

import com.b203.trou.entity.user.OAuth;
import com.b203.trou.model.user.Role;
import com.b203.trou.model.user.UserDto;
import com.b203.trou.entity.user.User;
import com.b203.trou.model.user.UserJoinDto;
import com.b203.trou.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import javax.transaction.Transactional;


@Service
@RequiredArgsConstructor
public class UserService  {

    private final UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // 회원 가입
    @Transactional
    public User createUser(UserJoinDto userjoindto) {
        User build = new User(userjoindto.getEmail(), passwordEncoder.encode(userjoindto.getPassword()) ,userjoindto.getName(), Role.USER);

        return userRepository.save(build);
    }

    // 로그인
    public UserDto signInUser(UserDto userDto) throws AuthenticationException {
        // 유저 찾아오고
        User user = userRepository.findByEmail(userDto.getEmail()).orElseThrow(() -> new AuthenticationException("해당하는 유저가 없습니다."));


        // usrDto 의 비밀번와비교
        if(!passwordEncoder.matches(userDto.getPassword(), user.getPassword())){
            throw new AuthenticationException("해당하는 유저가 없습니다.");
        }

        return new UserDto(user);

    }
    //이메일 중복 확인
    public User CheckUserEmail(String userEmail) throws AuthenticationException {

        return userRepository.findByEmail(userEmail).orElseThrow(()-> new AuthenticationException("해당하는 유저가 없습니다."));
    }

}
