package tenderi.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import tenderi.web.rest.TestUtil;

class TenderihomeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tenderihome.class);
        Tenderihome tenderihome1 = new Tenderihome();
        tenderihome1.setId(1L);
        Tenderihome tenderihome2 = new Tenderihome();
        tenderihome2.setId(tenderihome1.getId());
        assertThat(tenderihome1).isEqualTo(tenderihome2);
        tenderihome2.setId(2L);
        assertThat(tenderihome1).isNotEqualTo(tenderihome2);
        tenderihome1.setId(null);
        assertThat(tenderihome1).isNotEqualTo(tenderihome2);
    }
}
