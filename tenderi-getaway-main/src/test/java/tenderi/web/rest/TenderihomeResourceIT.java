package tenderi.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;

import java.time.Duration;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import tenderi.IntegrationTest;
import tenderi.domain.Tenderihome;
import tenderi.repository.TenderihomeRepository;
import tenderi.service.EntityManager;

/**
 * Integration tests for the {@link TenderihomeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient
@WithMockUser
class TenderihomeResourceIT {

    private static final String ENTITY_API_URL = "/api/tenderihomes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TenderihomeRepository tenderihomeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Tenderihome tenderihome;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tenderihome createEntity(EntityManager em) {
        Tenderihome tenderihome = new Tenderihome();
        return tenderihome;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tenderihome createUpdatedEntity(EntityManager em) {
        Tenderihome tenderihome = new Tenderihome();
        return tenderihome;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Tenderihome.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        tenderihome = createEntity(em);
    }

    @Test
    void getAllTenderihomesAsStream() {
        // Initialize the database
        tenderihomeRepository.save(tenderihome).block();

        List<Tenderihome> tenderihomeList = webTestClient
            .get()
            .uri(ENTITY_API_URL)
            .accept(MediaType.APPLICATION_NDJSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_NDJSON)
            .returnResult(Tenderihome.class)
            .getResponseBody()
            .filter(tenderihome::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(tenderihomeList).isNotNull();
        assertThat(tenderihomeList).hasSize(1);
        Tenderihome testTenderihome = tenderihomeList.get(0);
    }

    @Test
    void getAllTenderihomes() {
        // Initialize the database
        tenderihomeRepository.save(tenderihome).block();

        // Get all the tenderihomeList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(tenderihome.getId().intValue()));
    }

    @Test
    void getTenderihome() {
        // Initialize the database
        tenderihomeRepository.save(tenderihome).block();

        // Get the tenderihome
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, tenderihome.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(tenderihome.getId().intValue()));
    }

    @Test
    void getNonExistingTenderihome() {
        // Get the tenderihome
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }
}
