/*
  *  Dynamic array of basic types like integers
 */



#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <limits.h>
#include <string.h>





struct int_array {
    int* data;
        int size;
        int capacity;
};

int int_array_reserve(struct int_array* p, int n)
{
        if (n > p->capacity) {

            const size_t new_size_bytes = (size_t)n * sizeof(p->data[0]);
            void* pnew = realloc(p->data, new_size_bytes);
            if (pnew == NULL) return ENOMEM;

            p->data = pnew;
            p->capacity = n;
        }

        return 0;
}



int int_array_push_back(struct int_array* p, int value)
{
        if (p->size == INT_MAX) {
            return EOVERFLOW;
        }

        if (p->size + 1 > p->capacity) {

            unsigned long long new_capacity = p->capacity + p->capacity / 2;


            if (new_capacity < p->size + 1) {
                new_capacity = p->size + 1;
            }
            else if (new_capacity > INT_MAX) {
               new_capacity = INT_MAX;
            }

        int error = int_array_reserve(p, (int)new_capacity);
            if (error != 0) {
                return error;
            }
        }

        p->data[p->size] = value;

       /*
         after move (on success) the object book cannot be used 
         anymore. But we can still call destroy on it (with no effect)
         just for state simplification.
       */

        p->size++;

        return 0;
}

void int_array_destroy(struct int_array* p)
{

    free(p->data);
}


int main()
{
    struct int_array a = { 0 };
    int_array_push_back(&a, 1);
    int_array_push_back(&a, 2);
    int_array_destroy(&a);
}
