package appjava.service;

import appjava.entity.User;
import appjava.repository.UserRepository;

import java.util.List;


public class UserService {
    private static final User EMPTY = new User();

    private final UserRepository userRepository;

    public UserService(UserRepository repository) {
        this.userRepository = repository;
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElse(EMPTY);
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    public User findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    // public List<Student> findAllByNameAndAge(String name, int age) {
    //     return userRepository.findAllByNameAndAge(name, age);
    // }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
