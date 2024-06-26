package SniffStep.common.jwt.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@RedisHash("logoutToken")
@NoArgsConstructor
public class LogoutToken {

    @Id
    private String id;

    private String username;

    @TimeToLive
    private Long expiration;

    @Builder
    public LogoutToken(String id, String username, Long expiration) {
        this.id = id;
        this.username = username;
        this.expiration = expiration;
    }
}
