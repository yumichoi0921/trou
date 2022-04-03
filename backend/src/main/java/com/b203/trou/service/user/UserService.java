package com.b203.trou.service.user;

import com.b203.trou.model.user.UserDto;
import com.b203.trou.entity.user.User;
import com.b203.trou.repository.user.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User createUser(UserDto userdto) {
        User build = new User(userdto.getEmail(), userdto.getUserName(), userdto.getPassword());

        return userRepository.save(build);
    }

    public UserDto signInUser(UserDto userDto) throws AuthenticationException {
        // 유저 찾아오고
        User user = userRepository.findByEmail(userDto.getEmail()).orElseThrow(() -> new AuthenticationException("해당하는 유저가 없습니다."));


        // usrDto 의 비밀번와비교
        if(!user.getPassword().equals(userDto.getPassword())){
            throw new AuthenticationException("해당하는 유저가 없습니다.");
        }

        return new UserDto(user);

    }

    public List<UserDto> getEmails(String email) {
        List<User> emails = userRepository.findByEmailContaining(email).orElseThrow(() -> new IllegalArgumentException("해당하는 유저가 없습니다."));
        List<UserDto> result = emails.stream().map(user -> UserDto.builder().email(user.getEmail()).build()).collect(Collectors.toList());
        for (UserDto userDto : result) {
            System.out.print(userDto.getEmail());
        }
        System.out.println("여기야 여기");
        return result;
    }
}
